param ($installPath, $toolsPath, $package, $project)

Import-Module (Join-Path $toolsPath "Get-WebConfig.psm1")
Import-Module (Join-Path $toolsPath "Update-AssemblyBinding.psm1")

# Get the path to the current project
$projectPath = Split-Path -Parent $project.FullName

# Writing assembly redirect information

# Get the web.config as an XmlDocument
$webConfig = Get-WebConfig $projectPath

# If there is no web.config or there is no episerver element in the config then
# we assume this isn't an EPiServer site project and exit silently
if ($webConfig -eq $null -or $webConfig.configuration.episerver -eq $null)
{
	return
}

#load the configuration file for the project
$configPath = Join-Path $projectPath "web.config"
$config = New-Object xml
$config.psbase.PreserveWhitespace = $true
$config.Load($configPath)

$config = Update-AssemblyBinding $config $installPath

# save the new bindingRedirects
$config.Save($configPath)

Remove-Module "Update-AssemblyBinding"
