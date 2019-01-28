export const createInputListener = (key: string): () => boolean => {
    let fire = false;
    let fired = false;

    window.addEventListener('keydown', event => {
        if (event.code === key && fire === false) {
            fire = true;
        }
    });

    window.addEventListener('keyup', event => {
        if (event.code === key) {
            fired = false;
            fire = false;
        }
    });

    return () => {
        if (fired) {
            return false;
        }

        if (fire) {
            fired = true;
        }

        return fire;
    }
};
