# 夜の作品研究室

Threadsから訪れる読者に向けた、成人向け作品のデータ系キュレーションメディアの1ページサイトです。ランキング・レビュー数・評価・発売時期などを手がかりに、「なぜ残っているのか」を研究する世界観で設計しています。

## ファイル構成

```text
index.html       ページ本体・SEO/OGP設定
style.css        ダークネイビー〜紫のレスポンシブデザイン
script.js        Threads URL・作品カードの設定と表示
assets/          既存ビジュアルを置く場所
```

## 画像の配置

会話内の既存画像にはこの環境から直接アクセスできないため、画像ファイルは作り直していません。以下の2ファイルを後から `assets/` に配置してください。

- `assets/profile-icon.png` — 三日月＋虫眼鏡のプロフィールアイコン。ヘッダーとfaviconで使用します。
- `assets/hero-image.png` — 「夜の作品研究室」「データとレビューで発掘」の文字入りメインビジュアル。ヒーローとOGPで使用します。

配置前も、ページ側に用意した静かなCSSフォールバックが表示されます。画像を置くと自動的に実画像へ切り替わります。

## GitHub Pagesで公開する方法

1. GitHubの `Goddess83/adult` を開く。
2. `Settings` → `Pages` を開く。
3. `Build and deployment` の `Source` で `Deploy from a branch` を選ぶ。
4. Branchを `main`、フォルダを `/ (root)` にして `Save`。
5. 数分後に表示される公開URLを確認する。

このサイトはビルド不要の静的ファイルなので、`main` のルートをそのまま公開できます。

## Threads URLの変更場所

`script.js` 冒頭の `THREADS_URL` を変更してください。

```js
const THREADS_URL = "https://www.threads.net/@your-account";
```

ヘッダー下のThreadsリンクと研究ノート下のCTAが同じ設定値で更新されます。現在は審査前のため `"#"` のままです。

## アフィリエイトURLと商品カードの変更場所

`script.js` の `PRODUCTS` 配列を変更してください。各カードには次の項目があります。

- `title` — 商品名または仮タイトル
- `rating` — 評価
- `reviews` — レビュー数
- `note` — 研究メモ
- `affiliateUrl` — FANZA等のアフィリエイトURL
- `number` / `tag` — 発掘番号と分析タグ

新しいカードを追加する場合は、`PRODUCTS` に同じ形式のオブジェクトを追加するだけです。`affiliateUrl` は審査後に差し替えてください。現在のカード内容はすべて `TEMP DATA` です。

## 商品画像の追加方法

現状の仮カードは作品画像なしの分析カードです。実データ公開時に画像を表示する場合は、`PRODUCTS` の各オブジェクトへ `image` を追加し、`renderProducts()` のカードテンプレートに `<img src="${product.image}" ...>` を追加してください。画像は `assets/` 内に置き、権利・利用条件を確認したうえで使用してください。AV本編のキャプチャや露骨な画像は使用しません。

## ローカル確認方法

ビルドツールは不要です。リポジトリのルートで次のいずれかを実行し、表示されたURLをブラウザで開いてください。

```bash
python -m http.server 8000
```

または、VS Code等の静的サーバー拡張を使用してください。スマートフォン幅は375px〜430pxを基準に確認します。

## 将来GA4を追加する場所

Google Analyticsの測定IDが決まったら、`index.html` の `<head>` 内、`style.css` の読み込み前後にGoogle公式のGA4スニペットを追加してください。Threads CTAや作品CTAのクリック計測は、`script.js` の `bindConfiguredLinks()` 内へイベント送信を追加する想定です。Search Consoleは公開後に所有権確認用のmetaタグを同じく `<head>` に追加します。

## 将来の更新候補

- FANZAアフィリエイトURL
- 実際の商品名・商品画像・レビュー数・評価
- Threads URL
- GA4 / Search Console
- 独自ドメイン

現在のページには「当サイトはアフィリエイト広告を利用する場合があります。」「当サイトは18歳以上を対象としたコンテンツを紹介しています。」を表示しています。

