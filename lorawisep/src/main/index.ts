import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const { exec } = require('child_process')
const fs = require('fs')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }


  ipcMain.on('setParameters', (event, parameters) => {
    const {
      name, devices, environment, width, heigth, qtdGateways, algorithmOptimization
    } = parameters;

    console.log(parameters)
    console.log("devices: ", devices)

    event.reply('setParameters', 'ok')
    exec(`python3 src/main/scripts/gen-pos.py ${devices} ${width} ${heigth}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      
      // generateGraph()

      // event.reply('graphDone', 'ok')

      // Gateways configuration
      let cmd = ''
      const endevicesFile = './src/main/output/endevices.csv'

      console.log("antes de exec o python de otimização")

      switch (algorithmOptimization) {
        case 'K-Means':
          cmd = `python3 src/main/scripts/optmization/kmeans.py ${endevicesFile}`
          break
        // case 'fuzzy':
        //   cmd = `python3 src/main/scripts/fuzzy.py ${endevicesFile}`
        //   break
        // case 'genetic':
        //   cmd = `python3 src/main/scripts/genetic.py ${qtdGateways}`
        //   break
        // case 'random':
        //   cmd = `python3 src/main/scripts/random.py ${qtdGateways}`
        //   break
        default:
          break
      }

      console.log(cmd)

      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
      })

      // Gateways Posicion Graph

      exec(
        `python3 src/main/scripts/gen-scenario-graph.py`,
        async (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`)
            return
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
          }
          console.log("Gerou o gráfico indexjs")
          console.log(`stdout: ${stdout}`)

          // let imageData = fs.readFileSync("./src/main/output/complete-positions.png", { encoding: "base64" });
          // console.log("imageData: ", imageData)
          // mainWindow.webContents.send("graphDone", imageData)
          // event.reply('graphGatewaysDone', imageData)
          let imageData;
          try {
            imageData = await fs.readFileSync("./src/main/output/complete-positions.png", { encoding: "base64" });
            // console.log(imageData)
            mainWindow.webContents.send("graphDone", imageData);
          } catch (err) {
            console.error("Error reading image file:", err);
          }
        }
      )

    })
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const root_electron = __dirname;
console.log("root: ", root_electron)

const generateGraph = async () => {
  // const rootDir =
  // 'D:\\ufpi\\outros\\littoral\\projetos\\electron\\LoRaWISEP\\lorawisep\\src\\main\\'

  exec(
    `python3 ./src/main/scripts/gen-graph.py ./src/main/output/endevices.csv`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log("Gerou o gráfico")
      console.log(`stdout: ${stdout}`)

      // event.sender.send("graphDone");
    }
  )

  return true
}
