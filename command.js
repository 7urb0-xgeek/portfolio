export class CommandExecutor {
    constructor(outputElement) {
        this.output = outputElement;
        this.socialLinks = {
            github: 'https://github.com/yourusername',
            email: 'mailto:contact@example.com',
            telegram: 'https://t.me/yourtelegram',
            instagram: 'https://instagram.com/yourinstagram',
            website: 'https://yourportfolio.com',
            matrix: 'https://matrix.to/#/@matrixuser:matrix.org'
        };
    }

    async execute(command) {
        const [cmd, ...args] = command.toLowerCase().trim().split(' ');
        
        try {
            switch(cmd) {
                case 'help':
                    return await this.#getHelp();
                case 'about':
                    return await this.#getAbout();
                case 'github':
                    return this.#openSocialLink('github');
                case 'email':
                    return this.#openSocialLink('email');
                case 'telegram':
                    return this.#openSocialLink('telegram');
                case 'instagram':
                    return this.#openSocialLink('instagram');
                case 'website':
                    return this.#openSocialLink('website');
                case 'matrix':
                    return this.#startMatrixEffect();
                case 'projects':
                    return await this.#getProjects();
                case 'time':
                    return this.#getTime();
                case 'date':
                    return this.#getDate();
                case 'echo':
                    return this.#echo(args.join(' '));
                case 'whoami':
                    return this.#whoami();
                case 'quotes':
                    return await this.#getRandomQuote();
                case 'clear':
                    return this.#clearScreen();
                case 'exit':
                    return this.#exitTerminal();
                default:
                    return `Command not found: ${command}. Type 'help' for available commands`;
            }
        } catch (error) {
            console.error('Error executing command:', error);
            return `Error executing command: ${error.message}`;
        }
    }

    async #getHelp() {
        return `
Available commands:
help       - Show this help message
about      - Display about information
github     - Open GitHub profile
email      - Open email client
telegram   - Open Telegram profile
instagram  - Open Instagram profile
website    - Open portfolio website
matrix     - Start Matrix effect
projects   - List my projects
time       - Show current time
date       - Show current date
echo [text]- Repeat input text
whoami     - Show current user
quotes     - Display random quote
clear      - Clear the terminal screen
exit       - Close the terminal
`;
    }

    async #getAbout() {
        const response = await fetch('assets/about.txt');
        return await response.text();
    }

    async #getProjects() {
        const response = await fetch('assets/projects.txt');
        return await response.text();
    }

    async #getRandomQuote() {
        const response = await fetch('assets/quotes.txt');
        const quotes = (await response.text()).split('\n').filter(q => q.trim());
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex] || "No quotes available";
    }

    #openSocialLink(platform) {
        const link = this.socialLinks[platform];
        window.open(link, '_blank');
        return `Opening ${platform}...`;
    }

    #startMatrixEffect() {
        const matrixContainer = document.createElement('div');
        matrixContainer.classList.add('matrix-effect');
        document.body.appendChild(matrixContainer);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const columns = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < columns; i++) {
            const span = document.createElement('span');
            span.style.left = `${i * 20}px`;
            span.style.animationDuration = `${Math.random() * 2 + 1}s`;
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
            matrixContainer.appendChild(span);
        }

        setTimeout(() => {
            document.body.removeChild(matrixContainer);
        }, 5000); // Stop after 5 seconds

        return "Entering the Matrix...";
    }

    #getTime() {
        return new Date().toLocaleTimeString();
    }

    #getDate() {
        return new Date().toLocaleDateString();
    }

    #echo(text) {
        return text || "Nothing to echo";
    }

    #whoami() {
        return "guest-user@terminal-portfolio";
    }

    #clearScreen() {
        this.output.innerHTML = '';
        return '';
    }

    #exitTerminal() {
        setTimeout(() => {
            this.output.innerHTML += '<pre>Terminal session ended. Refresh to restart.</pre>';
        }, 500);
        return 'Closing terminal...';
    }
}
