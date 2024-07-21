export function checkEventName(value: string) {
    const format = /[~!@#$%^&*()_\-=[\]{};':"|,.<>/?]+/;
    if (format.test(value) || value.length > 50) {
        return false;
    } else {
        return true;
    }
}

