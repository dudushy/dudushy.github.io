#? TITLE && BRANCH setup
TITLE="[build_n_deploy.sh]"
BRANCH_NAME=$(git branch --show-current)
COMMIT_HASH=$(git rev-parse HEAD)
COMMIT_SHORT_HASH=$(git rev-parse --short HEAD)

echo $TITLE "setup config..."
echo $TITLE "- - - - - - - - - - - - - - - - - - - - - - - - - -"
#* vars

PAGE_URL="https://dudushy.github.io/"
echo $TITLE "- PAGE_URL=" $PAGE_URL

PROJECT_NAME="portfolio"
echo $TITLE "- PROJECT_NAME=" $PROJECT_NAME

COMMIT_MESSAGE='`'"${BRANCH_NAME}"':'"${COMMIT_SHORT_HASH}"'`'
echo $TITLE "- COMMIT_MESSAGE=" $COMMIT_MESSAGE

echo $TITLE "- - - - - - - - - - - - - - - - - - - - - - - - - -"
echo $TITLE "setup config done!"

#* main
echo $TITLE "run"
ng build --base-href $PAGE_URL
npx angular-cli-ghpages --dir=dist/$PROJECT_NAME --message=$COMMIT_MESSAGE

echo $TITLE "finished."
