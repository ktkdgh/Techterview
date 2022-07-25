import { io } from 'socket.io-client';

// export let socket = io(process.env.REACT_APP_BASE_URL, {
//   rejectUnauthorized: false // WARN: please do not do this in production
// });
export let socket = io.connect('https://3.35.82.134:8001',{ perMessageDeflate: false })
