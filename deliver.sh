zip -r build.zip build

sudo scp -i ../zxaws.pem build.zip zrthxn@zrthxn.com:/home/zrthxn/zxweb
sudo ssh -i ../zxaws.pem zrthxn@zrthxn.com "cd zxweb; unzip build.zip"

rm build.zip