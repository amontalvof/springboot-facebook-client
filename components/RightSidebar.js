import { BiSearch } from 'react-icons/bi';
import { RiVideoAddFill } from 'react-icons/ri';
import { CgMoreAlt } from 'react-icons/cg';
import Contacts from './Contacts';

const contactsInfo = [
    {
        name: 'Amanda Hug',
        src: 'https://randomuser.me/api/portraits/women/76.jpg',
        status: 'online',
    },
    {
        name: 'Theresa Green',
        src: 'https://randomuser.me/api/portraits/women/90.jpg',
        status: 'offline',
    },
    {
        name: 'Dave Allippa',
        src: 'https://randomuser.me/api/portraits/men/58.jpg',
        status: 'online',
    },
    {
        name: 'Ivana B. Withew',
        src: 'https://randomuser.me/api/portraits/women/26.jpg',
        statu: 'online',
    },
    {
        name: 'Anita Letterback',
        src: 'https://randomuser.me/api/portraits/women/30.jpg',
        status: 'offline',
    },
    {
        name: 'Chris Anthemum',
        src: 'https://randomuser.me/api/portraits/men/49.jpg',
        status: 'online',
    },
    {
        name: 'Norma Leigh Absent',
        src: 'https://randomuser.me/api/portraits/women/66.jpg',
        status: 'online',
    },
    {
        name: 'Sarah Moanees',
        src: 'https://randomuser.me/api/portraits/women/50.jpg',
        status: 'offline',
    },
    {
        name: 'Barry Kade',
        src: 'https://randomuser.me/api/portraits/men/20.jpg',
        status: 'online',
    },
];

const RightSidebar = () => {
    return (
        <div className="  hidden md:inline-flex flex-col pt-4 max-w-xl md:min-w-[200px] lg:min-w-[250px]">
            <div className="flex items-center text-gray-500">
                <p className="flex text-lg font-semibold flex-grow">Contacts</p>
                <div className="flex space-x-1 px-2">
                    <div className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                        <RiVideoAddFill />
                    </div>
                    <div className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                        <BiSearch />
                    </div>
                    <div className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                        <CgMoreAlt />
                    </div>
                </div>
            </div>
            {contactsInfo.map((contact, index) => (
                <Contacts {...contact} key={`contact-${index}`} />
            ))}
        </div>
    );
};

export default RightSidebar;
