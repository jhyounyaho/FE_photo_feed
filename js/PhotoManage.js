import Photo from './Photo.js';

export default class PhotoManage {
  constructor() {
    // localStorage에 있는 스크랩 리스트
    this.storageScrapList = null;

    // 로드 될 페이지 정보 
    this.photoLoadPage = 1;

    // 화면에 노출된 스크랩 갯수
    this.photoScrapCount = 0;
    // 스크랩 시작 num
    this.startNum = 0;
  }

  /*
    init function
    PhotoManage에서 관리하는 storageScrapList 데이터 초기화
  */
  init() {
    this.storageScrapList = localStorage.scraplist;

    !this.storageScrapList
      ? (localStorage.scraplist = JSON.stringify([]))
      : (this.storageScrapList = this.parsingScrapList());
  }

  /*
    getScrapList function
    스크랩 리스트 로드 from localStorage 
    @data   value : int 페이지 정보   
  */
  getScrapList = (value = null) => {
    // 첫 페이지 초기화 
    if (value === 1) {
      this.photoLoadPage = 1;
      this.photoScrapCount = 0;
      this.startNum = 0;
    }
    // 스크랩 로드시 노출되는 이미지 최대 갯수 - TODO 정책에 따라 변경
    const maxNum = 20;
    // 사용자가 스크랩한 리스트를 최신순으로 노출 - TODO 정책에 따라 변경
    this.storageScrapList = this.storageScrapList.reverse();

    if (this.storageScrapList.length > this.photoScrapCount)  { 
      for (let i = this.startNum; i < this.startNum + maxNum; i++) {
        if (this.storageScrapList.includes(this.storageScrapList[i])) {
          this.photoScrapCount++;
          new Photo(
            this.storageScrapList[i].id,
            this.storageScrapList[i].image_url,
            this.storageScrapList[i].nickname,
            this.storageScrapList[i].profile_image_url
          ); 
        } else {
          break;
        }
      }
      this.startNum += maxNum;
    } 
  }

  /*
    getPhotoList function
    포토 리뷰 리스트 로드 from API
    @data   value : int 페이지 정보 
    @return array photo 객체 생성 
  */
  getPhotoList = (value = null) => {
    if (value === 1) {
      this.photoLoadPage = 1;
    }
    fetch(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${this.photoLoadPage}.json`)
    .then((res) => {
      // API 통신 성공시에만 photo 객체 생성 
      if (res.status === 200 || res.status === 201) {
        res.json().then((json) => {
          json.map((photo) => {
            return new Photo(
              photo.id,
              photo.image_url,
              photo.nickname,
              photo.profile_image_url
            ); 
          })
        });
        this.photoLoadPage++;
      } else {
        new Error('API Error')
      }
    })
    .catch((error) => new Error('Fetch Error : ', error))
  }

  /*
    isScrap function
    해당 포토 리뷰의 ID 스크랩 여부 체크 function
    @data   id      : int 포토 리뷰 식별자 값  
    @return boolean true-스크랩 된 포토리뷰, false-스크랩 되지 않은 포토리뷰 
  */
  isScrap = (id) =>
    new Promise((resolve, reject) => {
      this.storageScrapList = this.parsingScrapList();

      const findScrap = this.storageScrapList.find((scrapId) => scrapId.id === id);
      if (findScrap) {
        // 스크랩 된 포토리뷰
        resolve(true);
      } else {
        // 스크랩 되지 않은 포토리뷰 
        resolve(false);
      }

      reject(new Error("no find photo"));
    });

  /*
    photoScrap function
    포토 리뷰 스크랩 function 
    @data   photo    : array 포토 정보 
  */
  photoScrap = (photo) =>
    new Promise((resolve, reject) => {
      this.storageScrapList = this.parsingScrapList();

      // id가 중복 저장되는 경우를 대비하여 scraplist에 id가 존재하는지 체크해준다.
      const findScrap = this.storageScrapList.find((scrap) => scrap.id === photo.id);
      if (!findScrap) {
        this.storageScrapList.push(photo);
        localStorage.scraplist = JSON.stringify(this.storageScrapList);
      } 

      resolve();
      reject(new Error("photoScrap error"));
    });

  /*
    photoScrapped function
    포토 리뷰 스크랩 취소 function 
    @data   id    : int 포토 리뷰 식별자 값  
  */
  photoScrapped = (id) =>
    new Promise((resolve, reject) => {
      this.storageScrapList = this.parsingScrapList();

      const updateScrapList = this.storageScrapList.filter(scrap => scrap.id !== id) 
      localStorage.scraplist = JSON.stringify(updateScrapList);

      resolve();
      reject(new Error("photoScrapped error"));
    });

  /*
    parsingScrapList function
    스크랩 리스트를 localStorage에서 파싱하여 가져오는 function 
    @return   array 파싱된 localstorage.scraplist 데이터 
  */
  parsingScrapList() {
    return localStorage.scraplist ? JSON.parse(localStorage.scraplist) : null;
  }
}