$(function(){
    let carouseList = $('#carousel ul');
    let controlList = $('#controls ul');

    function changeSlide(){
        carouseList.animate({'marginLeft': -400}, 500, moveFirstSlide)
    };

    function moveFirstSlide(){
        let controls = controlList.find('li');
        let firstItem = carouseList.find('li:first');
        let lastItem = carouseList.find('li:last');
        let next = firstItem.next();
        let id = next.attr('data-id');        
        let ctrlSelector = '[data-ctrl=' +id + ']';        
        controls.removeClass('active');                
        lastItem.after(firstItem);
        controls.filter(ctrlSelector).addClass('active');
        carouseList.css({marginLeft: 0});
        
    };

    function moveLastSlide(){
        let controls = controlList.find('li');
        let firstItem = carouseList.find('li:first');
        let lastItem = carouseList.find('li:last');        
        let id = lastItem.attr('data-id');        
        let ctrlSelector = '[data-ctrl=' +id + ']';        
        controls.removeClass('active');                
        firstItem.before(lastItem);
        controls.filter(ctrlSelector).addClass('active');
        carouseList.css({marginLeft: 0});
        //console.log('form moveLastSlide id = ' + id)
    };

    function getSelected(id, collection){         
        let _index = id;
        let _collection = collection;
        let _returnId;
        let selector = 'li[data-id=' + _index + ']';
        let selectedItem = carouseList.find(selector);
        _collection.each(function(idx){
            let current = $(this);
            if (current.attr('data-id') === selectedItem.attr('data-id')){
                _returnId = idx;
                return false
            } 
        });
        return _returnId
    };

    function moveItem(times){        
        if (times === 0) {
            return false
        };

        let _itemsToMove = times;


        let lastItem = carouseList.find('li:last');
        carouseList.find('li').each(function(id){
            if (id < _itemsToMove) {
                lastItem.after($(this));
                lastItem = carouseList.find('li:last')
            } else if (id == _itemsToMove) {return false}
        })
    };

    let auto = setInterval(changeSlide, 3000);

    //go to selected slide
    controlList.on('click', 'li', function(e){
        clearInterval(auto);
        controlList.find('li').removeClass('active');
        $(this).addClass('active');
        let clickId = $(this).attr('data-ctrl');        
        let collection = $('#carousel ul');
        let selectedImg = getSelected(clickId, collection.find('li'));
        carouseList.animate({'marginLeft': -400}, 500, function(){moveItem(selectedImg)});
        auto = setInterval(changeSlide, 3000)
    });
    
    // next slide
    $('#next').click(function(){
        clearInterval(auto);
        carouseList.animate({'marginLeft': -400}, 500, moveFirstSlide);
        auto = setInterval(changeSlide, 3000)
    });
  
    // prev slide
    $('#prev').click(function(){
        console.log('from click prev');
        clearInterval(auto);
        carouseList.animate({'marginLeft': -400}, 500, moveLastSlide);
        auto = setInterval(changeSlide, 3000)    
    })
})