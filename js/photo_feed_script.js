import PhotoManage from './PhotoManage.js';
let photoManage;
// 스크랩 페이지 여부 체크 true-스크랩한 것만 보기, false-일반 포토 피드(default) 
let isScrap = false;

document.addEventListener("DOMContentLoaded", () => {
  photoManage = new PhotoManage();
  photoManage.init();
  photoManage.getPhotoList();
});

/*
  스크랩한 것만 보기 버튼 클릭 이벤트 
*/
document.querySelector('.scrap_btn').addEventListener('click', () => {
  isScrap = !isScrap;
  document.querySelector('.photo_wrap').innerHTML = '';

  if (isScrap) {
    photoManage.getScrapList(1);
  } else {
    photoManage.getPhotoList(1);
  }
})

/*
  scroll 마지막일 경우 포토 후기 or 스크랩 리스트 뿌려주는 스크롤 이벤트 
*/
document.addEventListener("scroll", () => {
  if (
    Math.round($(window).scrollTop()) == $(document).height() - $(window).height()
  ) {
    if (isScrap) {
      photoManage.getScrapList();
    } else {
      photoManage.getPhotoList();
    }
  }
});