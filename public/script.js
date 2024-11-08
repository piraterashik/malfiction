document.getElementById('generate').addEventListener('click', generateChapter);

function generateChapter() {
    const genre = document.getElementById('genre').value;
    const tone = document.getElementById('tone').value;
    const setting = document.getElementById('setting').value || 'an unknown place';
    const alignment = document.getElementById('alignment').value;

    // Simulate AI-generated content
    const chapterText = `In ${setting}, a ${alignment.replace('-', ' ')} character embarks on a ${tone} ${genre} adventure.`;

    const storyDiv = document.getElementById('story');
    storyDiv.innerHTML = `
        <div class="chapter">
            <h2>Chapter 1</h2>
            <p contenteditable="true" class="editable">${chapterText}</p>
        </div>
        <div class="options">
            <h3>How would you like to continue?</h3>
            <button class="option-button" onclick="continueStory(1)">Option 1</button>
            <button class="option-button" onclick="continueStory(2)">Option 2</button>
            <button class="option-button" onclick="continueStory(3)">Option 3</button>
        </div>
    `;
}

function continueStory(option) {
    // Simulate different story paths
    const continuations = {
        1: 'The character discovers a hidden power within.',
        2: 'An unexpected ally appears.',
        3: 'A formidable enemy challenges the character.'
    };

    const storyDiv = document.getElementById('story');
    storyDiv.innerHTML += `
        <div class="chapter">
            <h2>Next Chapter</h2>
            <p contenteditable="true" class="editable">${continuations[option]}</p>
        </div>
        <div class="options">
            <h3>Choose your next move:</h3>
            <button class="option-button" onclick="continueStory(1)">Option 1</button>
            <button class="option-button" onclick="continueStory(2)">Option 2</button>
            <button class="option-button" onclick="continueStory(3)">Option 3</button>
        </div>
    `;
}
