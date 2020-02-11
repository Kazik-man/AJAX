getData = (url) => {
    return fetch(url).then(function (result) {
        return result.json();
    });
}

getData('https://jsonplaceholder.typicode.com/users').then(function(result) {
    if(result) {
        let list = ``;
        for(let user of result) {

            list += `<div class="user" onclick="showInfo(${user.id})">`;
            list += `<div class="user__name">${user.name}</div>`;
            list += `<div class="user__data"><i class="fas fa-phone"></i> ${user.phone}</div>`;
            list += `<div class="user__data"><i class="fas fa-envelope"></i> ${user.email}</div>`;
            list += `<div class="user__data"><i class="fas fa-globe-americas"></i> ${user.website}</div>`;
            list += `<div class="user__data"><i class="fas fa-map-marker-alt"></i> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</div>`;
            list += `</div>`;
        }

        list += `<div class="user user--empty"></div>`;
        list += `<div class="user user--empty"></div>`;

        document.getElementById('user-list').innerHTML = list;
    }
})

showInfo = (userId) => {
    const url = 'http://jsonplaceholder.typicode.com/posts?userId=' + userId;
    
    getData(url).then(function (result) {
        if(result) {
            let list = ``;
            //comment - это обращение к елементам нашего массива (резалт) "comment"может быть и другим словом
            for(let comment of result) {
                list += `<div class="user-post">`;
                list += `<div class="user-post__title">${comment.title}</div>`;
                list += `<div class="user-post__body">${comment.body}</div>`;
                list += `</div>`;
            }
            document.getElementById('post-list').innerHTML = list;
        }
    })
    document.getElementById('post-list').innerHTML = `<i class="user-info__load fas fa-sync"></i>`;
    document.querySelector('.js-user-info').classList.remove('user-info--hidden');
}

hideInfo = () => {
    document.querySelector('.js-user-info').classList.add('user-info--hidden');

    setTimeout(function() {
        document.getElementById('post-list').innerHTML = `<i class="user-info__load fas fa-sync"></i>`;
    }, 500);
}