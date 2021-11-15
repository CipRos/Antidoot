
wait(3)
local plr = game:GetService("Players").LocalPlayer.Name
local kv3ry = game:HttpGet("http://localhost:1337/verify?key="..getgenv().key.."&gameid="..game.PlaceId)
local JPN = loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/Stefanuk12/ROBLOX/master/Universal/Notifications/Script.lua"))()
    
if kv3ry == "paid" then
    spawn(function()
        JPN.newNotification("JustPro", "Successfully loaded!", Color3.fromRGB(255, 255, 255), {MainColour = Color3.fromRGB(102, 0, 51), BodyFont = Enum.Font.Cartoon, WaitTime = 3.5})
    end)
    wait(4.5)
    spawn(function()
        JPN.newNotification("JustPro", "Welcome "..plr.."Status: "..kv3ry, Color3.fromRGB(255, 255, 255), {MainColour = Color3.fromRGB(102, 0, 51), BodyFont = Enum.Font.Cartoon, WaitTime = 3.5})
    end)
    wait(4.5)
local library = loadstring(game:HttpGet("https://raw.githubusercontent.com/CipRos/bug-free-guacamole/main/menu.lua"))()
local justpro = library.new("JustPro", 5013109572)
local JPWindow = game:GetService("CoreGui"):WaitForChild("JustPro")
JPWindow.Enabled = false

-- settingss
local themes = {
Background = Color3.fromRGB(24, 24, 24),
Glow = Color3.fromRGB(0, 0, 0),
Accent = Color3.fromRGB(10, 10, 10),
LightContrast = Color3.fromRGB(20, 20, 20),
DarkContrast = Color3.fromRGB(14, 14, 14),  
TextColor = Color3.fromRGB(255, 255, 255)
}

-- first page
local page = justpro:addPage("Exploits", 5012544693)
local section1 = page:addSection("Exploits")

section1:addToggle("AutoFarm", nil, function(value)
if value==true then
spawn(function()
	while (value) do
		local model = game:GetService("Workspace")[plr.."sCar"]
        model.PrimaryPart = model.DriveSeat
        model:SetPrimaryPartCFrame(CFrame.new(602.15985107422, 200000.4581217765808, 1407.9093017578))
        model:SetPrimaryPartCFrame(model:GetPrimaryPartCFrame()*CFrame.fromEulerAnglesXYZ(0,.85,0))
		wait(1)
	end
end)
else
    local A_1 = game:GetService("Workspace")[plr .. "sCar"]
    local Event = game:GetService("ReplicatedStorage").DeleteCar
    Event:FireServer(A_1)
    wait(1)
    game:GetService("Players").LocalPlayer.Character.Humanoid.Health=0
    
end
print("Toggled", farm)
end)
section1:addButton("SuperSupra", function()
local cstats = require(game:GetService("Workspace")[plr.."sCar"]["A-Chassis Tune"])
cstats.Horsepower=4000
cstats.Weight = 10000
cstats.Ratios[11] = 0.20
cstats.Ratios[12] = 0.15
cstats.Ratios[13] = 0.10
cstats.Ratios[14] = 0.05
cstats.RBrakeForce=4000
cstats.FBrakeForce=4000
end)

local PlayersTable = {}
local Players = game:GetService("Players")

for i, v in pairs(Players:GetChildren()) do
    table.insert(PlayersTable, v.Name)
    --table.remove(PlayersTable, v.Name)
end

local playerspage = justpro:addPage("Players", 5012544693)
local plrsec = playerspage:addSection("Player List")
--print(PlayersTable)
getgenv().selectedPlayer = game.Players.LocalPlayer
local x = plrsec:addDropdown(#PlayersTable.." Players in Game", PlayersTable, function(text)
print("Selected", text)
getgenv().selectedPlayer = game.Players[text]
end)
local actionssec = playerspage:addSection("Actions")
actionssec:addButton("Teleport to", function()
local success, error = pcall(function()
game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = getgenv().selectedPlayer.Character.Torso.CFrame
end)
if not success then
warn(error)
end

end)

Players.PlayerAdded:Connect(function(player)
   for k in pairs (PlayersTable) do
    PlayersTable [k] = nil
   end 
for i, v in pairs(Players:GetChildren()) do
    table.insert(PlayersTable, v.Name)
    --table.remove(PlayersTable, v.Name)
end
section1:updateDropdown(x, #PlayersTable.." Players in Game", PlayersTable)
--table.remove(PlayersTable, player.Name) -- Removes from the table
end)
Players.PlayerRemoving:Connect(function(player)
       for k in pairs(PlayersTable) do
        PlayersTable[k] = nil
       end 
for i, v in pairs(Players:GetChildren()) do
    table.insert(PlayersTable, v.Name)
    --table.remove(PlayersTable, v.Name)
end
section1:updateDropdown(x, #PlayersTable.." Players in Game", PlayersTable)
end)

-- second page
local teleports = justpro:addPage("Teleports", 5012544693)
local fnf = teleports:addSection("FNF Stuff")
fnf:addButton("Key", function()
 game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(433, 7, 2314)
end)

fnf:addButton("Door", function()
 game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(799, 564, 2301)
end)

local scrpage = justpro:addPage("Scripts", 5012544693)
local scriptz = scrpage:addSection("Scripts")

scriptz:addButton("Infinite Yeld", function()
 loadstring(game:HttpGet(('https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source'),true))()
end)

local settings = justpro:addPage("Settings", 5012544693)
local colors = settings:addSection("Colors")

local section2 = settings:addSection("Others")
section2:addKeybind("Toggle Menu", Enum.KeyCode.Insert, function()
print("Activated Keybind")
justpro:toggle()
end, function()
print("Changed Keybind")
end)

for settings, color in pairs(themes) do -- all in one settings changer, i know, im cool
colors:addColorPicker(settings, color, function(color3)
justpro:setTheme(settings, color3)
end)
end

-- load
justpro:toggle()
wait(0.5)
JPWindow.Enabled = true
justpro:SelectPage(justpro.pages[1], true)
justpro:toggle()
else 
    spawn(function()
JPN.newNotification("JustPro", "Welcome "..plr..", no bypass for you", Color3.fromRGB(255, 255, 255), {MainColour = Color3.fromRGB(102, 0, 51), BodyFont = Enum.Font.Cartoon, WaitTime = 3.5})
wait(1)
loadstring(game:HttpGet(('https://pastebin.com/raw/M3CWgqn1'),true))()
    end)    
end