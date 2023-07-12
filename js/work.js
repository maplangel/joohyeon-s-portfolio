$(document).ready(function(){
    $('#fullpage').fullpage({
        anchors: ['page1','page2','page3','page4','page5','page6','page7','page8', 'page9', 'page10', 'page11', 'page12'],
        sectionsColor: ['#000', '#999', '#888', '#777', '#666', '#fff', '#999', '#888', '#777', '#666', '#fff', '#999'],
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: ['메뉴1', '메뉴2', '메뉴3', '메뉴4', '메뉴5', '메뉴6', '메뉴7', '메뉴8', '메뉴9', '메뉴10', '메뉴11', '메뉴12', '메뉴13'],
        keyboardScrolling: false,
    })
})