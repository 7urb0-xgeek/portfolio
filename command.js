export class CommandExecutor {
    constructor(outputElement) {
        this.output = outputElement;
        this.socialLinks = {
            github: 'https://github.com/codexart-lab',
            email: 'mailto: atmostechnexa@gmail.com',
            telegram: 'https://t.me/pheonixion',
            instagram: 'https://instagram.com/yourinstagram',
            website: 'https://7urb0-xgeek.github.io/portfolio/',
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
                case 'calculator':
                    return this.#calculate(args.join(' '));
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
calc       - Perform basic calculations
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

    #calculate(expression) {
    try {
        // Remove all whitespace from the expression
        expression = expression.replace(/\s+/g, '');

        // Validate the expression (only numbers and +, -, *, / are allowed)
        if (!/^[\d+\-*/.]+$/.test(expression)) {
            return "Invalid expression. Only numbers and +, -, *, / are allowed.";
        }

        // Evaluate the expression
        const result = eval(expression); // Using eval for simplicity (be cautious in production)
        return `Result: ${result}`;
    } catch (error) {
        return "Error: Invalid expression. Please check your input.";
    }
    }
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
        return "codex-user@portfolio";
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
