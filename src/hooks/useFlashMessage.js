import bus from '../utils/bus';

export default function UseFlashMessage () {
    function setMessage(msg, type) {
        bus.emit('flash', {
            message: msg,
            type: type,
        });
    }

    return { setMessage };
}