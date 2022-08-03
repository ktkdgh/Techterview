import { io } from 'socket.io-client';

//로콜용:
// export let socket = io.connect('http://localhost:8000',{ perMessageDeflate: false }, {secure: true})

//배포용:
export let socket = io.connect('https://techterview.site', { perMessageDeflate: false }, { secure: true })
