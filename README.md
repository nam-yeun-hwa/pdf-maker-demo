# fdf-maker-demo
PDFMarker은 PDF를 업로드하고 PDF의 각 페이지를 추가 하여 도장을 찍는 기능을 제공하는 애플리케이션입니다.

## 미리보기
<img src="https://github.com/nam-yeun-hwa/pdf-maker-demo/blob/main/public/sample.png?raw=true" width="500" height="auto"/>
아래 링크를 클릭하면 동영상 미리보기가 제공 됩니다.</br>
[📄 미리보기](https://drive.google.com/file/d/1Jvk1dQwbzZAHGGur31HfDuaFqhWcJxOV/preview)

## 주요 기능
- 도장은 최대 5개 업로드가 가능하고 하나의 도장은 여러번 찍을 수 있습니다. 
- 편집된 PDF는 다운로드 할수 있습니다.

## 사용 방법
1. PDF를 먼저 왼쪽 패널의 PDF 업로드 버튼을 이용해 업로드 합니다.
2. 오른쪽 패널에 PDF파일의 페이지들이 썸네일 리스트고 제공됩니다.
3. 썸네일로 제공되는 PDF파일을 눌러 가운데 미리보기 패널로 이동 시킵니다.
   - 차레대로 추가 시킬수 있고 중복은 허용되지 않습니다.
4. 왼쪽 패널에서 도장 업로드 버튼을 눌러 도장을 업로드 합니다.
   - 도장은 png 파일만 가능 합니다.
   - 도장은 여러번 찍을 수 있습니다.
   - 최대 5개의 도장만 업로드 할 수 있습니다.
5. 편집이 완료된 PDF는 왼쪽 패널에서 PDF다운로드 버튼을 눌러 다운로드 할수 있습니다.
6. 편집이 완전히 완료되면 PDF 삭제를 눌러 PDF 파일을 초기화 시켜줍니다.


## 기술 스택
- **프론트엔드**: React v19, Emotion v11
- **상태 관리**: Zustand v5
- **HTTP 요청**: Axios v1
- **PDF 처리**: pdf-lib v1, jsPDF v3, pdfjs-dist v5
- **캔버스**: Fabric.js v6
- **암호화**: CryptoJS v4
- **빌드 도구**: Vite v6, TypeScript v5
- **린팅**: ESLint v9, TypeScript ESLint v8
- **Emotion** : CSS-in-JS를 사용한 스타일링
  

# 폴더 구조
<pre>
PDFMarker/
├── public/                               # 정적 파일 (HTML, favicon 등)
├── src/                                  # 소스 코드의 메인 디렉토리
│   ├── assets/                           # 이미지, 폰트 등 정적 자원
│   │   ├── css/
│   │   │   └── App.css
│   │   ├── images/
│   │   └── fonts/
│   ├── components/                       # 재사용 가능한 UI 컴포넌트
│   │   ├── common/                       # 공통 컴포넌트 (Button, Input 등)
│   │   │   ├── Button.jsx
│   │   │   ├── FileNameDisplay.jsx
│   │   │   └── FileUpload.jsx
│   ├── hooks/                            # 커스텀 훅
│   │   ├── useButtonHandler.ts
│   │   ├── useCanvasControls.ts
│   │   ├── useFabricCanvas.ts
│   │   ├── useFileUploader.ts
│   │   ├── usePdfController.ts
│   │   └── usePdfThumbnails.ts
│   ├── utils/                            # 유틸리티 함수
│   │   ├── buttonStyleUtils.ts
│   │   ├── fabricUtils.ts
│   │   ├── fileUtils.ts
│   │   └── pdfUtils.ts
│   ├── styles/                           # 전역 스타일 및 테마
│   │   ├── ButtonStyles.ts
│   │   ├── FileNameDisplayStyles.ts
│   │   ├── PdfSelectViewerStyles.ts
│   │   ├── PdfThumbnailViewerStyles.ts
│   │   ├── StampControllerStyles.ts
│   │   ├── StampStyles.ts
│   │   ├── ButtonStyles.ts
│   │   └── StampUploaderStyles.ts
│   ├── store/                            # 상태 관리 (Zustand)
│   │   ├── canvasStore.ts
│   │   ├── pdfStore.ts
│   │   ├── selectedPdfStore.ts
│   │   └── stampStore.js
│   ├── App.jsx                           # 앱의 루트 컴포넌트
│   └── constants.js                      # 상수 정의 
├── .gitignore                            # Git 무시 파일
├── package.json                          # 프로젝트 의존성
├── README.md                             # 프로젝트 설명
└── vite.config.js                        # Vite 설정
</pre>

# 폴더 설명
**assets/**
- 이미지, 폰트, CSS 등 정적 자원을 관리합니다.
- css/App.css: 애플리케이션 전역 스타일을 정의합니다.
- images/ 및 fonts/: UI에 필요한 그래픽 및 글꼴 파일을 저장합니다.
  
**components/**
- 재사용 가능한 UI 컴포넌트를 포함합니다.
- common/: 버튼(Button.jsx), 파일 업로드(FileUpload.jsx), 파일명 표시(FileNameDisplay.jsx) 등 공통적으로 사용되는 컴포넌트가 위치합니다.

**hooks/**
- 커스텀 훅을 통해 로직을 분리하고 재사용성을 높였습니다.
- 예: useFabricCanvas.ts(Fabric.js 캔버스 관리), usePdfController.ts(PDF 제어), useFileUploader.ts(파일 업로드 처리).

**utils/**
- 반복 사용되는 유틸리티 함수를 모아둔 디렉토리입니다.
- 예: pdfUtils.ts(PDF 관련 도구), fabricUtils.ts(캔버스 작업 도구), fileUtils.ts(파일 처리 도구).

**styles/**
- Emotion을 활용한 스타일 파일이 모여 있습니다. 각 컴포넌트에 맞춘 스타일 객체가 정의되어 있습니다.
- 예: ButtonStyles.ts, PdfThumbnailViewerStyles.ts.

**store/**
- Zustand를 사용한 상태 관리 로직이 포함됩니다.
- canvasStore.ts(캔버스 상태), pdfStore.ts(PDF 상태), stampStore.js(스탬프 상태) 등으로 상태를 모듈화했습니다.

이 프로젝트는 UI 컴포넌트(components/), 비즈니스 로직(hooks/, utils/), 상태 관리(store/), 스타일링(styles/)이 각각 독립적으로 관리되며, 
Vite를 통해 빠르고 효율적인 개발 환경이 구축되었습니다. PDF 편집 및 캔버스 작업에 특화된 기능을 제공하며, TypeScript를 활용해 타입 안정성을 확보 합니다.
