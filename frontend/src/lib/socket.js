import { io } from 'socket.io-client';

// export let socket = io(process.env.REACT_APP_BASE_URL, {
//   rejectUnauthorized: false // WARN: please do not do this in production
// });
export let socket = io.connect('https://techterview.vercel.app:443',{ perMessageDeflate: false })
