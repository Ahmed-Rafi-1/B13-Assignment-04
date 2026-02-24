Question 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer :
    ->getElementById is used to select one element using it's id and It always return only one element because id is unique.
    getElementsByClassName is used to select elements by class name.It returns a HTMLCollection.It can return many elements if same class used many time.
    querySelector is more flexible.It select the first element that match a CSS selector.
    querySelectorAll also use CSS selector but it returns all matching elements.

Question 2. How do you create and insert a new element into the DOM?

    ->First we create element using document.createElement().
    for example :
        let a = document.createElement("p");
        a.innerText = "Hello World";
    Then we insert it into DOM using method appendChil()
    like : document.body.appendChild(a);

Question 3. What is Event Bubbling? And how does it work?

    ->Event bubbling is a process where event start from target element and then go up to its parent element.
    For example, if we click a button inside a div,then first button event will run,and the div event will run, then body.
    So event bubble from child to parent.

Question 4. What is Event Delegation in JavaScript? Why is it useful?
    ->Event delegation means we can add event listener to parent instead of adding to many child elements.It reduce memory usage,it works for dynamically added elements and code become more clean and short.For example if we have many list items,instead of adding click event to every li,we add event to ul and check which li was clicked.

Question 5. What is the difference between preventDefault() and stopPropagation() methods?
    -> preventDefault() is use to stop the default behaviour of element. Like stop form from submitting or stop link from opening.
    stopPropagation() is use to stop the event from bubbling to parent element.
