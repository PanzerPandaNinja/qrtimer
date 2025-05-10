export function confirmPause (language = 'en') {
    const lang = localStorage.getItem('qrtimer_language') || (navigator.language.startsWith('nb' || 'nn') ? 'no' : 'en');
    const messages = lang === 'no' 
        ? 'Starte tiden på nytt for denne posten? Den forløpte tiden vil bli regnet som en pause.' 
        : 'Restart timer for this post? The elapsed time will be counted as a pause.';

    const userResponse = confirm(messages);
    return userResponse;
}
