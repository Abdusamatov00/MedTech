import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import {
  Button,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from "@mui/material";
import { User, LogOut, KeyRound } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout, changePassword } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handlePasswordChange = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      alert("Password changed successfully!");
      setOpenDialog(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Failed to change password");
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="mx-auto px-5 sm:px-6 lg:px-9">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
            MedTech
          </h1>

          {/* User menu */}
          {user && (
            <>
              <IconButton onClick={handleMenuOpen} size="large">
                <User size={24} className="text-gray-700" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  className:
                    "rounded-xl shadow-xl border border-gray-200 w-80 overflow-hidden",
                }}
              >
                {/* User info card */}
                <MenuItem disabled className="!p-0">
                  <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                        <User size={28} />
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Role</p>
                        <p className="font-semibold">{user.role}</p>
                        <p className="text-sm opacity-80">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </MenuItem>

                <Divider />

                {/* Actions */}
                <MenuItem
                  onClick={() => {
                    setOpenDialog(true);
                    handleMenuClose();
                  }}
                  className="rounded-lg hover:bg-blue-50 transition !py-3"
                >
                  <KeyRound size={18} className="mr-2 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    Change Password
                  </span>
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                  className="rounded-lg hover:bg-red-50 transition !py-3"
                >
                  <LogOut size={18} className="mr-2 text-red-600" />
                  <span className="font-medium text-red-600">Logout</span>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ className: "rounded-2xl shadow-2xl" }}
      >
        <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <KeyRound className="text-blue-600" size={20} />
          <span>Change Password</span>
        </DialogTitle>
        <DialogContent className="space-y-5 mt-2">
          <TextField
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions className="p-4 space-x-3">
          <Button
            onClick={() => setOpenDialog(false)}
            className="rounded-lg normal-case"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            color="primary"
            className="rounded-lg normal-case px-5"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};
