export function disconnect() {
    localStorage.removeItem('token')
    window.location.href = '/login'
}