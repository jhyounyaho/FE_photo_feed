# javascript로 사진 피드 만들기 

### 1. 개발 환경
- HTML5
- Javascript, jQuery 
- CSS

### 2. library
jquery	3.5.1

### 3. 디렉토리     
    ├── css                         # css파일 저장 폴더             
    └── img                         # img파일 저장 푤더                 
    └── js                          # js파일 저장 푤더                    
        ├── jquery-3.5.1.min.js     # jquery                 
        ├── Photo.js                # Photo class 로직이 있는 file                   
        ├── PhotoManage.js          # PhotoManage class 로직이 있는 file                    
        └── photo_feed_script.js    # photo_feed.html에서 로드하는 스크립트 file             
    └── photo_feed.html                             
                             
### 4. localStorage에 들어갈 scraplist data                      
scraplist = {                              
        id: 582237,                                      
        image_url: "https://image.ohou.se/image/central_crop/bucketplace-v2-development/uploads-cards-snapshots1547480104_.jpeg/640/640"          
        nickname: "사용자 21"                        
        profile_image_url: "https://image.ohou.se/image/central_crop/bucketplace-v2-development/uploads-default_images-avatar.png/80/80"                                       
}        
구분값 scraplist.id                                              
스크랩한 것만 모아보기시 외부 url과의 API 통신을 줄이고, 
사용자가 설정한 스크랩을 최신순으로 노출하기 위해 localStorage 에 스크랩 정보 저장 
                               
### 5. 기능 
- 사진 하나의 class 구현                    
- localStorage                    
  - 스크랩한 사진의 정보를 localStorage에 저장하여 리로드시 동일 결과 노출                    
- 페이지 로드                    
  - 사용자가 스크롤을 진행함에 따라 api 통신하여 다음 페이지의 사진을 불러옴                   
  - 빈 값이 나올때까지 지속적으로 api 통신하여 다음 페이지를 불러옴                   
    - 스크랩일경우 localStorage와 api 통신하여 페이지 불러옴                    
    - 포토 피드일 경우 외부 url과 api 통신하여 페이지 불러옴                   
- 스크랩 기능                    
  - 각각의 사진을 스크랩 함                   
  - 스크랩 버튼을 누른 경우 localStorage에 스크랩한 사진 정보를 저장                   
  - 스크랩 버튼을 누른 경우 스크랩 버튼 색상이 파란색으로 변함                   
  - 스크랩 취소 버튼을 누른 경우 localStorage에 해당 ID의 사진 정보를 삭제                   
  - 스크랩 취소 버튼을 누른 경우 스크랩 버튼 색상이 회색으로 변함                    
  - 이후 새로고침을 하였을때, 스크랩된 사진의 경우 스크랩된 상태인 파란색으로 표                   
- 필터 기능 (스크랩한 것만 보기)                   
  - 스크랩한 것만 모아보기 기능을 사용한 경우 스크랩된 사진만 불러옴                   
    - localStorage에서 스크랩 정보 불러옴.                   
    - 사용자가 저장한 최신순으로 노출                    
    - 페이지 로드시 최대 갯수 api 통신시 가져오는 이미지 갯수와 동일하게 20개 제한                                 
  - 스크랩한 것만 모아보기 기능을 취소한 경우 포토 피드 사진 불러옴                   
  

### 6. 결과 화면                     
포토 피드 결과 화면                             
![photo_feed](https://user-images.githubusercontent.com/42309919/101116006-a08aaf80-3627-11eb-9782-07c2211cf3ae.PNG)         
스크랩한 것만 보기 결과 화면                    
![scrap_feed](https://user-images.githubusercontent.com/42309919/101116012-a2547300-3627-11eb-9373-031d37825211.PNG)              
