import PhotoManage from './PhotoManage.js';

export default class Photo {
  constructor(id, image_url, nickname, profile_image_url) {
    this.id = id; // ID 식별자 
    this.image_url = image_url; // 리뷰 img url 
    this.nickname = nickname; // 닉네임 
    this.profile_image_url = profile_image_url; // 프로필 img url 

    this.photoManage = new PhotoManage();

    this.createDOM();
  }

  /*
    createDOM function
    사진리뷰 DOM 생성 및 이벤트 function 호출  
  */
  createDOM() {
    const scrap = ` 
      <button class="photo_scrap" value="scrap" aira-label="스크랩">
        <img src="img/on-img.svg" class="on-img">
      </button>
      `;
    const scrapped = ` 
      <button class="photo_scrap" value="scrapped" aira-label="스크랩 취소">
        <img src="img/blue.svg" class="blue">
      </button>
      `;

    this.photoManage
      .isScrap(this.id)
      .then((res) => {
        // 스크랩 여부 체크해서 노출
        const scrapBlock = res === true ? scrapped : scrap; 

        $(".photo_wrap").append(`
          <div class="photo_card_wrap photo_card_${this.id}">
            <div>
              <img src="${this.profile_image_url}" class="ic_avatar_cat" />
              <p class="Tommy-Cummings">${this.nickname}</p>
            </div>
            <div class="review_wrap">
              <img src="${this.image_url}" class="Rectangle" />
              ${scrapBlock}
            </div>
          </div>
        `);

        this.bindPhotoEvent();
      })
      .catch((error) => {
        new Error("createDOM error ", error);
      });
  }

  /*
    bindPhotoEvent function
    event 관련 함수 
  */
  bindPhotoEvent() {
    // scrap click event
    const scrap_button = document.querySelector(`.photo_card_${this.id} button`);
    scrap_button.addEventListener("click", this.scrapEvent.bind(this), false);
  }

  /*
    scrapEvent function
    스크랩/스크랩 취소 함수 
  */
  scrapEvent = (e) => {
    if (e.target.parentElement.value == 'scrap') {
      // 스크랩
      this.photoManage
        .photoScrap({
          id: this.id,
          image_url: this.image_url,
          nickname: this.nickname, 
          profile_image_url: this.profile_image_url
        })
        .then(() => {
          // scrap -> scrapp 변경
          document.querySelector(`.photo_card_${this.id} button`).value = 'scrapped';
          document.querySelector(`.photo_card_${this.id} button`).setAttribute('aira-label', '스크랩 취소');
          document.querySelector(`.photo_card_${this.id} button img`).className = 'blue';
          document.querySelector(`.photo_card_${this.id} button img`).setAttribute('src', 'img/blue.svg');
        })
        .catch((error) => {
          new Error('scrapp error : ', error);
        });
    } else {
      // 스크랩 취소
      this.photoManage
        .photoScrapped(this.id)
        .then(() => {
          // scrapped -> scrap 변경
          document.querySelector(`.photo_card_${this.id} button`).value = 'scrap';
          document.querySelector(`.photo_card_${this.id} button`).setAttribute('aira-label', '스크랩');
          document.querySelector(`.photo_card_${this.id} button img`).className = 'on-img';
          document.querySelector(`.photo_card_${this.id} button img`).setAttribute('src', 'img/on-img.svg');
        })
        .catch((error) => {
          new Error('scrapped error : ', error);
        });
    }
  }
}