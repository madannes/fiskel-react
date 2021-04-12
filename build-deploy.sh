export REACT_APP_VERSION=$(date +%y.%m.%d).$(git rev-parse --short HEAD)
npm run build && surge build fiskel.surge.sh