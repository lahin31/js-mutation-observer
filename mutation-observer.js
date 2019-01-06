/**
 * JavaScript Mutation Observer
 * To track down any update of the DOM without any delay
 */

let observer;

document.addEventListener('DOMContentLoaded', init);

function init() {

    let p = document.querySelector('main > p');
    
    // change the dom content, attribute after 2 second and track them immediately after 2 sec
    setTimeout(function () {
        p.textContent = 'this is the new content ';

        let button = document.createElement('button');
        let button_content = document.createTextNode('Click Me');
        button.appendChild(button_content);
        p.appendChild(button);

        let className = 'my-text';
        p.setAttribute('class', className);
    }, 2000);

    // configuration
    let config = {
        attributes: true,
        childList: true,
        characterData: false,
    }

    // making MutationObserver constructor function 
    observer = new MutationObserver(function (mutatedList) {
        for(let mutation of mutatedList) {
            // logging out which types of change happening in our dom
            if(mutation.addedNodes.length) {
                console.log(`A child node ${mutation.addedNodes[0].textContent} added!`);
            }
            if(mutation.removedNodes.length) {
                console.log(`A child node ${mutation.removedNodes[0].textContent} removed!`);
            }
            else if(mutation.type === 'attributes') {
                console.log(`The ${mutation.attributeName}: ${mutation.target.className} attribute updated.`);
            }
        }
        // disconnecting the observer to run again
        observer.disconnect();
    });
    observer.observe(p, config)
}