function makeEditableContainer(name, selector, data) {
    var target = document.querySelector(selector);
    console.log(selector);
    if(target) {
        if(typeof(data) == 'object') {
            Object.keys(data).forEach(function(childName, index){
                Object.keys(data[childName]).forEach(function(childSelector) {
                    makeEditableContainer(name + "." + childName.split("<-")[1] + "." + index, selector + " " + childSelector, "." + data[childName][childSelector].split(".")[1]);                    
                })
            });
        }
        target.attributes['data-path'] = name + "." + data;
        target.classList.add('edit-box');
    }
}

Object.keys(window.page.directive).forEach(function(selector){
    makeEditableContainer("page", selector, window.page.directive[selector]);
});

document.querySelectorAll('.edit-box').forEach(function(editable) {
    editable.onclick = function(target) {
        target = target.target;
        var save = window.prompt("Editing " + target.attributes['data-name'], target.innerHTML);
        if(save) {
            target.innerHTML = save;
        }
    };
});