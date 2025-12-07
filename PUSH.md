# How to push this repo to your GitHub account

This file contains a single script and step-by-step commands to create a repository under your GitHub account and push the current commit.

Important: You must run these commands locally on your machine where you can authenticate with GitHub (browser-based). Do NOT share tokens here.

1) (Optional) Install GitHub CLI if you don't have it:

```powershell
winget install --id GitHub.cli -s winget
```

2) Authenticate `gh` (run once):

```powershell
gh auth login
```

Follow the browser flow and authenticate as the GitHub user you control.

3) Create the repo and push (single command):

```powershell
# Replace <your-login> with your GitHub username (no spaces). Example: OlunladeMuiz
gh repo create <your-login>/centralized-student-resource-portal --private --source . --push
```

If you prefer `main` as the branch name (recommended):

```powershell
git branch -M main
gh repo create <your-login>/centralized-student-resource-portal --private --source . --push
```

4) Verify:

```powershell
git remote -v
gh repo view <your-login>/centralized-student-resource-portal --web
```

-- End
