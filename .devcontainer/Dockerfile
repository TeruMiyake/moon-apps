# Dockerfile のリファレンスとベスト・プラクティス
# https://docs.docker.jp/engine/reference/builder.html
# https://docs.docker.jp/develop/develop-images/dockerfile_best-practices.html

# Dockerfile の基本的なテンプレート
# https://docs.docker.jp/engine/reference/builder.html

# ベースイメージの指定
FROM node:lts-hydrogen

# 1. vim インストール
# 2. mysql-client インストール（動作確認等に用いる）
# 3. apt-get clean でキャッシュを削除
# 4. rm -rf /var/lib/apt/lists/* で不要なファイルを削除してイメージ軽量化
RUN apt-get update && apt-get install -y \
    vim \
    mariadb-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# コンテナのユーザを変更
USER node

# ワークディレクトリの指定（以降の RUN 命令等の作業ディレクトリを指定）
RUN mkdir -p /home/node/moon-apps
WORKDIR /home/node/moon-apps