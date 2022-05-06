# Spotted Seal Mobile

## Prerequisite

下記が Global にインストールされていること

- Node.js@16
- yarn
- expo@5

## Serve

```
$ yarn start
```

## Append New Category

### 1. カード情報と画像データをセット

1. data-fetch でカード情報と画像データを取得
1. カード情報を assets/cardInfo 配下に配置
1. 画像データを S3 の対象バケットに配置

### 2. 新しいカテゴリ情報をセット

1. src/domains/card.ts に新しいカテゴリの定義を追加
1. src/configs/all-card-list.ts に新しいカテゴリの定義を追加
