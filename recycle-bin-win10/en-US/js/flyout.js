////////////////////////////////////////////////////////////////////////////////
//
//  THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.
//  http://se7enth.com
//  Copyright (c) 2006 Seventh Sense Studio.  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
var isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);

////////////////////////////////////////////////////////////////////////////////
//
// FLYOUT FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////
window.onload = function()
{
	// add event handlers
	binEmptyLink.onmouseup = emptyRecycleBin;
	binOpenLink.onmouseup = openRecycleBin;
	binPropertiesLink.onmouseup = showRecycleSettings;

	binEmptyLink.blur(); // TODO: this doesn't work for some reason
	binContents.innerText = System.Shell.RecycleBin.fileCount + " files, " + System.Shell.RecycleBin.folderCount + " folders";
	binSize.innerText = convertBytes(System.Shell.RecycleBin.sizeUsed);
	binEmpty.style.display = isEmpty ? "none" : "block";
}

////////////////////////////////////////////////////////////////////////////////
// empty Recycle Bin
////////////////////////////////////////////////////////////////////////////////
function emptyRecycleBin()
{
	binEmptyLink.blur();
	isEmpty = (System.Shell.RecycleBin.fileCount + System.Shell.RecycleBin.folderCount == 0);
	if (!isEmpty)
	{
		System.Shell.RecycleBin.emptyAll();
	}
}

////////////////////////////////////////////////////////////////////////////////
// open Recycle Bin in Explorer
////////////////////////////////////////////////////////////////////////////////
function openRecycleBin()
{
	binOpenLink.blur();
	System.Shell.execute("Explorer", "/N,::{645FF040-5081-101B-9F08-00AA002F954E}");
}

////////////////////////////////////////////////////////////////////////////////
// show Recycle Bin Properties
////////////////////////////////////////////////////////////////////////////////
function showRecycleSettings()
{
	binPropertiesLink.blur();
	System.Shell.RecycleBin.showRecycleSettings();
}

////////////////////////////////////////////////////////////////////////////////
// convert bytes to user-friendly string
////////////////////////////////////////////////////////////////////////////////
function convertBytes(bytes)
{
	if (bytes >= 1073741824)
	{
		return Math.floor(bytes / 1024 / 1024 / 1024) + " GB";
	}
	else if (bytes >= 1048576)
	{
		return Math.floor(bytes / 1024 / 1024) + " MB";
	}
	else if (bytes >= 1024)
	{
		return Math.floor(bytes / 1024) + " KB";
	}
	else if (bytes > 0 & bytes < 1024)
	{
		return Math.floor(bytes) + " bytes";
	}
	else
	{
		return "0 bytes";
	}
}
