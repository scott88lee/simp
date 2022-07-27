module.exports.createNewUser = function(input) {
    if (input.password.length < 8) {
        return {Message: 'Password must be at least 8 characters long' }
    }
    let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email_regex.test(input.email) == false) {
        return { Message: 'Invalid email' }
    }
    if (/[a-z]/.test(input.password) === false) {
        return {Message: 'Password must contain at least 1 lowercase character.' }
    }
    if (/[A-Z]/.test(input.password) == false) {
        return {Message: 'Password must contain at least 1 uppercase character.' }
    }
    if (/\d/.test(input.password) == false) {
        return {Message: 'Password must contain at least 1 number.' }
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input.password) == false) {
        return {Message: 'Password must contain at least 1 special character.' }
    }
}