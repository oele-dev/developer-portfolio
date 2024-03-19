import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'My FAB',
        description: "Web application developed with VILT Stack, allows to design rainwater gutters according to the parts and length of the design.",
        tools: ['Laravel', 'Inertia JS', 'Vue', 'MySQL', 'Node Mailer', 'Puppeteer', 'Nginx'],
        role: 'Full Stack Developer',
        code: '',
        demo: 'www.runlayouttool.com',
        image: crefin,
    },
    {
        id: 2,
        name: 'Google Workspace And Laravel integration',
        description: 'I developed and implemented a PHP package that allowed the integration of Google Workspace services, such as Google Meet, Google Classroom, Calendar and Workspace Accounts, with a Laravel applications. This facilitated communication and data exchange between Laravel applications and Google Workspace services.',
        tools: ['Laravel', 'Tailwind CSS', "Google Workspace", "VueJS", "MySQL", "Gmail Passkey"],
        role: 'Full Stack Developer',
        code: '',
        demo: 'ovy.co',
        image: travel,
    },
    {
        id: 3,
        name: 'Web Sockets Fingerprint and Web App',
        description: 'I led the development of a native application that connected to a fingerprint reader. Using WebSockets, we were able to have the web application register and authenticate fingerprints through the browser in a Laravel application. This allowed for secure and efficient fingerprint enrollment in real time.',
        tools: ['Laravel', 'Web Sockets', 'C#', 'Fingerprint Reader', 'Device', 'Native'],
        code: '',
        role: 'Full Stack Developer',
        demo: '',
        image: realEstate,
    },
    {
        id: 4,
        name: 'MikroTik and Laravel Integration',
        description: "I created a PHP package that facilitated communication with MikroTik devices via SSH commands. This package allowed performing configuration and administration operations on MikroTik devices, such as obtaining information, network configuration and service management, all from a Laravel application.",
        tools: ['Laravel', 'MikroTik API', 'SSH'],
        code: 'https://github.com/oele-dev/mikrotik-api',
        demo: '',
        image: ayla,
        role: 'Full Stack Developer',
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },