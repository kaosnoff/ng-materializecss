Write-Output "Building..."

# Clean up previous build files
if (Test-Path -Path build) { Remove-Item -Path .\build -Recurse }
if (Test-Path -Path dist) { Remove-Item -Path .\dist -Recurse }

# Run Angular Compiler to generate build directory
npx ngc -p src/tsconfig.json

# Copy all files from build to dist, except for JavaScript files
robocopy build dist /ia:A /xf *.js /nfl /np /njh /njs /ndl /nc /ns

# Copy package.json and other resources to dist
Copy-Item README.md -Destination dist
Copy-Item LICENSE -Destination dist
Copy-Item .npmignore -Destination dist

# Clean up build directory
if (Test-Path -Path build) { Remove-Item -Path .\build -Recurse }

Write-Output "Build complete!"