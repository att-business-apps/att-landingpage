# att-landingpage

### git commands
printf "protocol=https\nhost=github.com\nusername=<me>" |   git credential-manager-core get

git remote add origin https://github.com/att-business-apps/att-landingpage.git

git tag -a v1.0.0 -m "release base version"
git show v1.0.0
git tag -l "v1.8.5*"
git push origin v1.0.0
git tag -d v1.0.0

### create release out of the tag
Create and push a release:
git release tag_name
Create and push a signed release:
git release tag_name -s
Create and push a release with a message:
git release tag_name -m "message"

hello git