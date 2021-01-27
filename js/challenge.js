const counter = document.getElementById('counter');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');

const likesList = document.getElementsByClassName('likes')[0];
const commentsList = document.getElementsByClassName('comments')[0];

const createCommentForm = document.getElementById('comment-form');
const createCommentInput = document.getElementById('comment-input');

// Timer function
let isPaused = false;
let timer = function(){
    return setInterval(() => {
        if (!isPaused) {
            const timeNumber = parseInt(counter.innerText);
            counter.innerText = timeNumber + 1;
        }
    }, 1e3);
}
let interval = timer();

// event functions
const decreaseCounter = event => {
    const timeNumber = parseInt(counter.innerText);
    if (timeNumber > 0) {
        counter.innerText = timeNumber - 1;
    }
}

const increaseCounter = event => {
    const timeNumber = parseInt(counter.innerText);
    counter.innerText = timeNumber + 1;
}

const pause = event => {
    event.preventDefault();
    isPaused = !isPaused;
    if (isPaused == true) {
        pauseButton.innerText = "resume";
    } else {
        pauseButton.innerText = "pause";
    }
    [].slice.call(document.getElementsByTagName("button")).forEach(button => {
        if (button.id !== "pause") {
            button.disabled = isPaused            
        }
    });
}

const likeTime = event => {
    const timeNumber = parseInt(counter.innerText);
    const likedNumber = likesList.querySelector(`#like_${timeNumber}`)
    if (likedNumber == null) {
        const newLike = document.createElement("li");
        newLike.setAttribute("id",`like_${timeNumber}`);
        newLike.setAttribute("data-num",1);
        newLike.innerText = `${timeNumber} has been liked 1 time`;
        likesList.appendChild(newLike);
    } else {
        likedNumber.setAttribute("data-num",parseInt(likedNumber.getAttribute("data-num"))+1);
        const likesNumber = likedNumber.getAttribute("data-num");
        likedNumber.innerText = `${timeNumber} has been liked ${likesNumber} times`;
    }
}

const addComment = event => {
    event.preventDefault();

    const commentContent = createCommentInput.value;

    const newComment = document.createElement("p");
    newComment.innerText = commentContent;
    commentsList.appendChild(newComment);

    event.target.reset();
}

// event listeners
minusButton.addEventListener("click", decreaseCounter);
plusButton.addEventListener("click", increaseCounter);
pauseButton.addEventListener("click", pause);
heartButton.addEventListener("click", likeTime);
createCommentForm.addEventListener("submit", addComment);