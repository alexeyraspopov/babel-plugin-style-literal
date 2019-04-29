workflow "Master Test Run" {
  resolves = ["Test"]
  on = "push"
}

action "Setup" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "yarn install --no-lockfile"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Setup"]
  runs = "yarn test --ci"
}
