#include "DHT.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define DPIN 4
#define DTYPE DHT11

#define LED_PIN D0
#define GND_PIN D1

#define LED_PIN2 D3
#define GND_PIN2 D4

#define LED_PIN3 D5
#define GND_PIN3 D6

#define LED_PIN4 D7
#define GND_PIN4 D8

const int analogPin = A0;
const int maxAnalogValue = 1023;
const char* ssid = "sos";
const char* password = "374gpbttt";
const char* mqtt_server = "192.168.101.191";
const char* mqtt_user = "admin";
const char* mqtt_password = "12345678";
const char* action_topic = "action";
const char* response_topic = "response";


const int mqtt_port = 2003;
DHT dht(DPIN, DTYPE);

WiFiClient espClient;
PubSubClient client(espClient);


bool newMessage = false;
char messageBuffer[512];


void setup_wifi() {
  delay(10);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  payload[length] = '\0';
  strcpy(messageBuffer, (char*)payload);
  newMessage = true;
}



void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      client.subscribe(action_topic);
    } else {
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  dht.begin();

  pinMode(LED_PIN, OUTPUT);
  pinMode(GND_PIN, OUTPUT);
  digitalWrite(GND_PIN, LOW);

  pinMode(LED_PIN2, OUTPUT);
  pinMode(GND_PIN2, OUTPUT);
  digitalWrite(GND_PIN2, LOW);

  pinMode(LED_PIN3, OUTPUT);
  pinMode(GND_PIN3, OUTPUT);
  digitalWrite(GND_PIN3, LOW);

  pinMode(LED_PIN4, OUTPUT);
  pinMode(GND_PIN4, OUTPUT);
  digitalWrite(GND_PIN4, LOW);
}

int convertToLightIntensity(int analogValue) {
  return map(analogValue, 0, maxAnalogValue, -1, 1023);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

void loop() {

  float tc = dht.readTemperature(false);
  float tf = dht.readTemperature(true);
  float hu = dht.readHumidity();

  if (!client.connected()) {
    reconnect();
  }
  client.loop();


  int analogValue = analogRead(analogPin);

  int lightIntensity = convertToLightIntensity(analogValue);

  StaticJsonDocument<512> doc;
  JsonArray data = doc.createNestedArray("data");

  JsonObject lux1 = data.createNestedObject();
  lux1["name"] = "Lux1";
  lux1["value"] = lightIntensity;

  JsonObject hot1 = data.createNestedObject();
  hot1["name"] = "Thermometer1";
  hot1["value"] = tc;

  JsonObject water1 = data.createNestedObject();
  water1["name"] = "Hygrometer1";
  water1["value"] = hu;

  char buffer[512];
  serializeJson(doc, buffer);
  delay(1000);
  client.publish("value", buffer);

  // if (newMessage) {
  //   StaticJsonDocument<512> actionDoc;
  //   DeserializationError error = deserializeJson(actionDoc, messageBuffer);
  //   if (!error) {
  //     const char* name = actionDoc["name"];
  //     const char* status = actionDoc["status"];
  //     if (strcmp(name, "Fan1") == 0) {
  //       if (strcmp(status, "on") == 0) {
  //         digitalWrite(LED_PIN, HIGH);
  //       } else if (strcmp(status, "off") == 0) {
  //         digitalWrite(LED_PIN, LOW);
  //       }
  //     }
  //     if (strcmp(name, "Fan2") == 0) {
  //       if (strcmp(status, "on") == 0) {
  //         digitalWrite(LED_PIN2, HIGH);
  //       } else if (strcmp(status, "off") == 0) {
  //         digitalWrite(LED_PIN2, LOW);
  //       }
  //     }
  //     if (strcmp(name, "Light1") == 0) {
  //       if (strcmp(status, "on") == 0) {
  //         digitalWrite(LED_PIN3, HIGH);
  //       } else if (strcmp(status, "off") == 0) {
  //         digitalWrite(LED_PIN3, LOW);
  //       }
  //     }
  //     if (strcmp(name, "Light2") == 0) {
  //       if (strcmp(status, "on") == 0) {
  //         digitalWrite(LED_PIN4, HIGH);
  //       } else if (strcmp(status, "off") == 0) {
  //         digitalWrite(LED_PIN4, LOW);
  //       }
  //     }
  //   }
  //   newMessage = false;
  // }
  if (newMessage) {

    char name[50];
    char status[4];
    sscanf(messageBuffer, "%49[^_]_%3s", name, status);
    StaticJsonDocument<64> responseDoc;
    JsonObject deviceStatus = responseDoc.to<JsonObject>();
    deviceStatus["device"] = name;
    deviceStatus["status"] = status;
    char responseBuffer[64];
    serializeJson(deviceStatus, responseBuffer);
    if (strcmp(name, "Fan1") == 0) {
      digitalWrite(LED_PIN, strcmp(status, "on") == 0 ? HIGH : LOW);

    } else if (strcmp(name, "Fan2") == 0) {
      digitalWrite(LED_PIN2, strcmp(status, "on") == 0 ? HIGH : LOW);

    } else if (strcmp(name, "Light1") == 0) {
      digitalWrite(LED_PIN3, strcmp(status, "on") == 0 ? HIGH : LOW);

    } else if (strcmp(name, "Light2") == 0) {
      digitalWrite(LED_PIN4, strcmp(status, "on") == 0 ? HIGH : LOW);
    }

    client.publish(response_topic, responseBuffer);

    newMessage = false;
  }
}
