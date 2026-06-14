In this tutorial, we will walk through the steps required to configure a **3D LiDAR sensor** (such as a Velodyne or RoboSense) on a UGV rover running **ROS 2 Humble**.

### Hardware Requirements
- A 3D LiDAR (Ethernet-based)
- On-board computing unit (e.g., Jetson Orin or Intel NUC)
- Stable 12V/24V power supply

### Step 1: Network Configuration
First, set up your network interface to communicate with the LiDAR's default IP address (usually `192.168.1.200` or similar).

Configure a static IP on your host computer:
```bash
# Set static IP on ethernet card
sudo ip addr add 192.168.1.100/24 dev eth0
```

Verify that you can ping the LiDAR:
```bash
ping 192.168.1.200
```

### Step 2: ROS 2 Driver Setup
Clone the official ROS 2 driver package into your workspace's `src` folder:

```bash
cd ~/ros2_ws/src
git clone -b humble https://github.com/ros-drivers/velodyne.git
```

Install dependencies and compile:
```bash
cd ~/ros2_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Step 3: Launching the Sensor Nodes
Source the workspace and run the launch file:
```bash
source ~/ros2_ws/install/setup.bash
ros2 launch velodyne_driver velodyne_driver_node-launch.py
```

### Step 4: Visualizing in RViz
Open RViz 2 to verify the point cloud data output:
1. Run `rviz2`.
2. Add the `PointCloud2` display type.
3. Select the topic `/velodyne_points`.
4. Change the fixed frame to `velodyne` or the appropriate sensor base frame.

You should now see the active 3D scanning points rendered on screen!
