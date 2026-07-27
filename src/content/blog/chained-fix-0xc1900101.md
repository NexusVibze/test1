---
title: "How to Fix 0xC1900101 in Windows 11 Upgrade Installation"
description: "A simplified step-by-step troubleshooting guide for resolving error code 0xC1900101 using clear real-world human analogies."
pubDate: 2026-07-27
---

# How to Fix 0xC1900101 in Windows 11 Upgrade Installation

## Quick Overview
The 0xC1900101 error typically appears during a Windows 11 upgrade when a driver or system service prevents the installation from completing. This guide walks you through proven fixes, from resetting update services to running system integrity checks, all marked safe for your device.

## Why It Happens
This stop code is often triggered by incompatible or outdated drivers, corrupted Windows Update components, or third‑party software that interferes with the upgrade process. When the setup engine encounters a roadblock it cannot bypass, it aborts and returns 0xC1900101.

## Fix Method 1: Resetting Windows Update Services
1. Open **Command Prompt** as administrator.  
2. Stop the relevant services:  
   ```cmd
   net stop wuauserv
   net stop cryptSvc
   net stop bits
   net stop msiserver
   ```
3. Rename the SoftwareDistribution and Catroot2 folders:  
   ```cmd
   ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
   ren C:\Windows\System32\catroot2 Catroot2.old
   ```
4. Restart the services:  
   ```cmd
   net start wuauserv
   net start cryptSvc
   net start bits
   net start msiserver
   ```
5. Attempt the Windows 11 upgrade again.

### Simplified Analogy for This Fix
Think of Windows Update as a busy post office. Over time, mail piles up in the sorting area (SoftwareDistribution) and some parcels get mislabeled (Catroot2). By temporarily closing the post office, moving the old mail to a storage room, and reopening with a clean sorting floor, you let new upgrades flow through without getting stuck on old, jumbled parcels.

## Fix Method 2: Performing a Clean Boot
1. Press **Win + R**, type `msconfig`, and hit Enter.  
2. Go to the **Services** tab, check **Hide all Microsoft services**, then click **Disable all**.  
3. Switch to the **Startup** tab and click **Open Task Manager**.  
4. In Task Manager, disable every startup item.  
5. Close Task Manager, click **OK** in System Configuration, and restart your PC.  
6. Try the Windows 11 upgrade again. If it succeeds, re‑enable services and startup items one by one to pinpoint the culprit.

### Simplified Analogy for This Fix
Imagine your computer is a crowded kitchen where many chefs (background programs) are cooking at once, and the new recipe (Windows 11 upgrade) keeps getting interrupted. A clean boot asks every chef to step out, leaving only the essential staff (Microsoft services) to prepare the dish. Once the upgrade finishes, you can invite the chefs back, watching to see which one caused the spill.

## Fix Method 3: Running DISM and System File Checker
1. Open **Command Prompt** as administrator.  
2. Run the Deployment Image Servicing and Management tool to repair the Windows image:  
   ```cmd
   DISM /Online /Cleanup-Image /RestoreHealth
   ```
3. After DISM completes, run the System File Checker:  
   ```cmd
   sfc /scannow
   ```
4. Restart the computer and retry the upgrade.

### Simplified Analogy for This Fix
Consider your Windows system as a library. Over time, some books (system files) get damaged or go missing. DISM is like a specialist who orders fresh copies from the publisher to replenish the collection, while sfc is the diligent librarian who walks the shelves, verifying each book’s integrity and replacing any that are still faulty. Together they restore a complete, healthy library ready for the new upgrade volume.

## Fix Method 4: Removing Third‑Party Antivirus Temporarily
1. Open **Settings** → **Apps** → **Apps & features**.  
2. Locate your third‑party antivirus program, select it, and click **Uninstall**. Follow the prompts to remove it.  
3. Reboot the computer.  
4. Attempt the Windows 11 upgrade.  
5. After the upgrade succeeds, reinstall your preferred antivirus from the vendor’s website.

### Simplified Analogy for This Fix
Think of a security guard at a building entrance who sometimes mistakes legitimate visitors for threats and blocks them. Temporarily removing the guard lets the moving crew (Windows 11 upgrade) bring in the new furniture without being stopped. Once the move is complete, you can hire a new, more accurate guard (reinstall the antivirus) to resume protection.
