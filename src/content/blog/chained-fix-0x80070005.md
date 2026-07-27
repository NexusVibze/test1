---
title: "How to Fix 0x80070005 in Windows 11 Update"
description: "A simplified step-by-step troubleshooting guide for resolving error code 0x80070005 using clear real-world human analogies."
pubDate: 2026-07-27
---

# How to Fix 0x80070005 in Windows 11 Update

## Quick Overview
Error 0x80070005 (E_ACCESSDENIED) blocks Windows 11 updates when the system lacks permission to read, write, or modify essential files, services, or registry entries. The fix involves resetting permissions, correcting service accounts, or repairing corrupted system components.

## Why It Happens
The error typically originates from one of three sources:
- **Incorrect folder permissions** on update‑related directories (e.g., `SoftwareDistribution` or the user’s Downloads folder).  
- **The Windows Update service running under a limited account** that cannot access required files or registry keys.  
- **Corrupted or locked system files** in the update repository, preventing the installer from completing its tasks.

---

## Fix Method 1: Repairing File System Permissions for Update Folders
**Targeted root cause:** Misconfigured or restrictive NTFS permissions on the folders Windows 11 uses to stage updates.

**Precise paths:**  
- `C:\Windows\SoftwareDistribution`  
- `C:\Users\<YOUR_USERNAME>\Downloads` *(replace `<YOUR_USERNAME>` with your actual account name)*  

**Exact commands (run in an elevated Command Prompt):**  
```cmd
# Grant full control to SYSTEM and the current user for update folders
icacls "C:\Windows\SoftwareDistribution" /grant:(S)(BU):F /t
icacls "C:\Users\<YOUR_USERNAME>\Downloads" /grant:(S)(BU):F /t

# Alternative: reset ownership to SYSTEM then re‑grant rights
takeown /F "C:\Windows\SoftwareDistribution" /A
icacls "C:\Windows\SoftwareDistribution" /grant:r SYSTEM:(F)
```
*After executing the commands, retry the Windows Update process.*

### Simplified Analogy for This Fix
Think of the update folders as a library where Windows needs to place new books (updates). If the librarian (the system) doesn’t have a key to the shelves, the books can’t be shelved. The commands above hand the librarian a master key and re‑label the shelves so anyone with proper clearance can access them, letting the update process place its new books without being turned away at the door.

---

## Fix Method 2: Adjusting Windows Update Service Permissions
**Targeted root cause:** The Windows Update service (`wuauserv`) operating under a low‑privilege account that lacks necessary file or registry access.

**Precise registry key:**  
- `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WindowsUpdate`

**Exact commands (run in an elevated Command Prompt):**  
```cmd
# Stop the service, reset its executable path, then restart it
net stop wuauserv
sc config wuauserv binPath= "C:\Windows\System32\wuauclt.exe"
net start wuauserv

# Alternative: force the service to run as the LocalSystem account via registry
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WindowsUpdate" /v AccountName /t REG_EXPAND_SZ /d "SYSTEM"
```
*After applying these changes, restart your PC and check for updates again.*

### Simplified Analogy for This Fix
Imagine the Windows Update service as a delivery driver who’s only allowed to enter the building’s lobby but not the storage rooms where the packages (update files) sit. By re‑assigning the driver to a master‑key holder (the LocalSystem account) or fixing the truck’s route (the service executable path), the driver can now reach the storage rooms, unload the packages, and complete the delivery.

---

## Fix Method 3: Repairing Corrupted System Files
**Targeted root cause:** Damaged or locked system files/DLLs in the Windows update repository (e.g., `msupdate.dll`, `wuauserv.dll`) that impede the update engine.

**Precise paths:**  
- `C:\Windows\System32` (update‑related DLLs)  
- `C:\Windows\WinSxS` (Side‑by‑Side component store)

**Exact commands (run in an elevated Command Prompt):**  
```cmd
# Repair the Windows image using DISM
dism.exe /online /cleanup-image /restorehealth

# Alternative: reset Windows Update components
net stop bits
net stop wuauserv
net stop appserver
net.exe stop wuauserv
net.exe stop bits
cd C:\Windows
wusa.exe /quiet /nointeraction /repair /wait /all /forcerun
```
*After the repairs finish, reboot and attempt the update once more.*

### Simplified Analogy for This Fix
Consider the system files as the foundation and wiring of a house. Over time, some bricks may crack or wires fray, causing the lights (updates) to flicker or fail. Running DISM is like calling a contractor to reinforce the foundation and replace damaged beams, while the component‑reset steps are akin to resetting the circuit breaker and reconnecting loose wires—restoring solid, reliable power so the lighting system (Windows Update) can work correctly again.
