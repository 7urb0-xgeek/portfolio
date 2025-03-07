import { CommandExecutor } from './command.js';

const commandInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const commandExecutor = new CommandExecutor(output);
let commandHistory = [];
let historyIndex = -1;

commandInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        
        // Display command
        output.innerHTML += `<div class="input-line"><span class="prompt">$</span> ${command}</div>`;
        
        // Execute command and display result
        const result = await commandExecutor.execute(command);
        if (result) {
            output.innerHTML += `<pre>codex-user@portfolio${result}</pre>`;
        }
        
        commandInput.value = '';
        output.scrollTop = output.scrollHeight;
    } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
    }
});

// Initial welcome message
window.onload = function() {
    output.innerHTML = `<pre>
Welcome to Codex - Terminal Portfolio
Type 'help' to see available commands
</pre>`;
};
