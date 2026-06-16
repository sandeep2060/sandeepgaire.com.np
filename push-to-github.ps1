param(
    [string]$RemoteUrl = "https://github.com/sandeep2060/sandeepgaire.com.np.git",
    [string]$Branch = "main",
    [string]$UserName = "",
    [string]$UserEmail = ""
)

function Ensure-Git {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Error "git is not installed or not in PATH. Install Git and rerun this script."
        exit 1
    }
}

Ensure-Git

Push-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)

try {
    if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
        Write-Output "Initializing a new git repository..."
        git init || throw "git init failed"
    } else {
        Write-Output "Repository already initialized."
    }

    if ($UserName) { git config user.name "$UserName" }
    if ($UserEmail) { git config user.email "$UserEmail" }

    $status = git status --porcelain
    if ($status) {
        Write-Output "Staging changes..."
        git add . || throw "git add failed"
        Write-Output "Committing..."
        git commit -m "Automated commit: update project files" || Write-Output "No commit created (maybe identical commit)"
    } else {
        Write-Output "No changes to commit."
    }

    Write-Output "Setting branch to '$Branch'..."
    git branch -M $Branch 2>$null || Write-Output "Could not rename branch, continuing..."

    $existing = & git remote get-url origin 2>$null
    if ($LASTEXITCODE -eq 0 -and $existing) {
        Write-Output "Updating existing remote 'origin' to $RemoteUrl"
        git remote set-url origin $RemoteUrl || throw "git remote set-url failed"
    } else {
        Write-Output "Adding remote 'origin' -> $RemoteUrl"
        git remote add origin $RemoteUrl || throw "git remote add failed"
    }

    Write-Output "Pushing to remote..."
    git push -u origin $Branch || throw "git push failed"

    Write-Output "Push completed successfully."
} catch {
    Write-Error "Error: $_"
    exit 1
} finally {
    Pop-Location
}
