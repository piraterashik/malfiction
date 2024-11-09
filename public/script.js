document.getElementById('generate').addEventListener('click', generateChapter);

async function generateChapter() {
    const genre = document.getElementById('genre').value;
    const tone = document.getElementById('tone').value;
    const setting = document.getElementById('setting').value || 'an unknown place';
    const alignment = document.getElementById('alignment').value;

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ genre, tone, setting, alignment })
        });

        if (response.ok) {
            const data = await response.json();
            const chapterText = data.story;

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
        } else {
            console.error('Server error:', response.statusText);
            alert('Failed to generate the chapter. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the chapter.');
    }
}

async function continueStory(option) {
    const allChapters = document.querySelectorAll('.editable');
    let storySoFar = '';
    allChapters.forEach(chapter => {
        storySoFar += chapter.textContent + ' ';
    });

    const options = {
        1: 'The character decides to explore a mysterious cave.',
        2: 'A strange traveler offers unexpected advice.',
        3: 'An old enemy resurfaces with a new threat.'
    };
    const chosenOption = options[option];

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ storySoFar, chosenOption })
        });

        if (response.ok) {
            const data = await response.json();
            const continuationText = data.story;

            const storyDiv = document.getElementById('story');
            storyDiv.innerHTML += `
                <div class="chapter">
                    <h2>Next Chapter</h2>
                    <p contenteditable="true" class="editable">${continuationText}</p>
                </div>
                <div class="options">
                    <h3>Choose your next move:</h3>
                    <button class="option-button" onclick="continueStory(1)">Option 1</button>
                    <button class="option-button" onclick="continueStory(2)">Option 2</button>
                    <button class="option-button" onclick="continueStory(3)">Option 3</button>
                </div>
            `;
        } else {
            console.error('Server error:', response.statusText);
            alert('Failed to generate the next chapter. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the next chapter.');
    }
}
