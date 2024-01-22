/**
 * Utils.ts
 * Make sure only the dynamic reusable functions only present here!!!
 */

const random = (): number => {
    const crypto = window.crypto;
    const array = new Uint32Array(1);
    if (crypto?.getRandomValues) crypto?.getRandomValues(array); // Compliant for security-sensitive use cases
    return (!!array.length) ? Number('0.' + array[0]) : 0.1;
};

export const guid = (withHyphen: string = '-'): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[-]/g, withHyphen).replace(/[xy]/g, (c) => {
        const r = random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getKey = (): string => {
    return random().toString(36).slice(3, 13);
};


export const getFileNameFromURL = (url) => {
    return new URL(url).pathname.split('/').pop();
}

export const encodeImageFileAsURL = (file: File) => {
    return new Promise((resolve) => {
        var reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result)
        }
        reader.readAsDataURL(file);
    })
}

export const urltoFile = (url: string, filename: string, mimeType: string) => {
    if (url.startsWith('data:')) {
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, { type: mime || mimeType });
        return Promise.resolve(file);
    }
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, { type: mimeType }));
}