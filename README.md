# 🍵 質感茶葉電商平台 (React E-commerce)

## 🎯 專案目標 (Project Goals)
本專案的核心目標是開發一個具備現代化使用者體驗的單頁式應用程式 (SPA)，主要用於：
* **跨框架技術實踐：** 將 Vue 3 的開發邏輯轉化為 React 實作，驗證自身對不同主流前端框架的快速掌握與適應能力。
* **電商系統邏輯演練：** 完整實作從商品列表、分類篩選到購物車狀態管理的核心電商流程。
* **UI/UX 精緻化：** 透過組件化開發，確保在不同裝置上都能提供流暢且一致的響應式互動體驗。

## 🛠️ 技術棧 (Tech Stack)
本專案採用以下技術架構，並針對不同需求進行選型：

| 技術 / 框架 | 負責功能與用途 |
| :--- | :--- |
| **React 18** | 作為核心框架，利用其宣告式語法與 **Hooks** (useState, useEffect, useContext) 構建高效的元件 UI 與生命週期管理。 |
| **React Router** | 建立多頁面導覽結構（如：首頁、產品列表頁、詳細頁），實作流暢的 SPA 無跳轉換頁體驗。 |
| **Context API** | 用於全域狀態管理，特別是**購物車系統**，避免多層級的 Props Drilling，提升資料傳遞效率。 |
| **CSS Modules / SCSS** | 實作組件化樣式管理，解決樣式衝突問題，提升維護性。 |
| **Axios** | 負責非同步 **RESTful API** 串接，實作商品資料獲取與錯誤處理機制。 |

## ✨ 核心功能 (Key Features)
* **動態購物車系統：** 實作商品的新增、移除、數量修改，並即時計算總金額與小計。
* **響應式佈局 (RWD)：** 針對手機、平板與桌面端進行深度優化，確保導覽列與商品格點完美適配。
* **商品過濾與搜尋：** 透過資料過濾邏輯，讓使用者能根據分類快速尋找目標商品。
* **精緻互動特效：** 運用 CSS Animation 與 React 狀態控制，提升加入購物車時的視覺回饋。

---

## 🚀 Getting Started (本地端啟動指南)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites
請確保您的電腦已安裝 Node.js。

### Installation & Setup

1. Clone the repository:
```bash
git clone [https://github.com/michael9487/react-ecommerce-tea-website.git](https://github.com/michael9487/react-ecommerce-tea-website.git)
