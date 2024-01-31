import { Input, Typography } from 'antd';

const Profile = () => {
    return <div >
        <div className='w-[40%]'>
            <div >
                <Typography.Title level={5}>Major</Typography.Title>
                <Input
                    defaultValue="Multimedia Technology"
                    readOnly={true}
                />
            </div>
            <div className='mt-[20px]'>
                <Typography.Title level={5}>Skills</Typography.Title>
                <div className='flex flex-col gap-[20px]'>
                <Input
                    defaultValue="Front-end: HTML, CSS, JavaScript, ReactJs, Angular"
                    readOnly={true}
                />
                <Input
                    defaultValue="Back-end: Java, Spring boot, Kafka"
                    readOnly={true}
                />
                <Input
                    defaultValue="Other: Docker, Jenkins, AWS"
                    readOnly={true}
                />
                </div>
              
            </div>
        </div>

    </div>
}

export default Profile;