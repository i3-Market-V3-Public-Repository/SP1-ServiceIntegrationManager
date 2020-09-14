import 'dart:io';
import 'package:path/path.dart';
import 'package:recase/recase.dart';

void main() {
  if (!checkRequirements()) return;
  final serviceName = askName();
  downloadRepository(serviceName);
  changeName(serviceName);
  setupSSL('./${serviceName.paramCase}');
}

bool checkRequirements() {
  print('Checking requirements, please wait.');
  if (Process.runSync('git', ['--help'], runInShell: true).exitCode != 0) {
    print('Git is not installed.\n'
        'Please install git (https://git-scm.com/downloads) and run this script again');
    return false;
  }
  if (Process.runSync('node', ['--help'], runInShell: true).exitCode != 0) {
    print('Node.js is not installed.\n'
        'Please install Node.js (https://nodejs.org/en/download/) and run this script again');
    return false;
  }
  if (Process.runSync('lb4', ['--help'], runInShell: true).exitCode != 0) {
    print('Loopback 4 is not installed.\nInstalling Loopback 4.');
    Process.runSync('npm', ['i', '-g', '@loopback/cli']);
    if (Process.runSync('lb4', ['--help'], runInShell: true).exitCode != 0) {
      print('Loopback 4 has not been installed successfully.\n'
          'Install Loopback 4 (https://loopback.io/doc/en/lb4/Getting-started.html) '
          'manually and run this script again');
      return false;
    }
  }
  print('All requirements checked.');
  return true;
}

String askName() {
  print("Introduce the name of the service.\nDon't worry about caps, but separate the words "
      "with spaces.\nFor example, if your service is Cloud wallet, write 'cloud wallet' or "
      "'Cloud Wallet', but not CloudWallet:\nService name:");
  return stdin.readLineSync();
}

void downloadRepository(String serviceName) {
  final folderName = serviceName.paramCase;
  print('Downloading template');
  final clone = Process.runSync('git', [
    'clone',
    '--branch',
    'develop',
    'git@gitlab.com:i3-market/code/wp4/backplane-subsystem-template.git',
    folderName
  ]);
  if (clone.exitCode != 0) {
    print('There has been an error while cloning the template:');
    print(clone.stderr);
    exit(1);
  }
  Directory('./$folderName/.git').deleteSync(recursive: true);
  Process.runSync('git', ['init'], workingDirectory: './$folderName');
  print('Template downloaded');
  print('Write git username:');
  final username = stdin.readLineSync();
  print('Write git email:');
  final email = stdin.readLineSync();
  Process.runSync('git', ['config', 'user.name', username], workingDirectory: './$folderName');
  Process.runSync('git', ['config', 'user.email', email], workingDirectory: './$folderName');
}

void changeName(String serviceName) {
  final newName = '${serviceName.pascalCase}ServiceApplication';
  for (final file
      in Directory('./${serviceName.paramCase}/src').listSync(recursive: true).whereType<File>()) {
    if (extension(file.path) == '.ts') {
      final contents = file.readAsStringSync().replaceAll('ServiceTemplateApplication', newName);
      file.writeAsStringSync(contents);
    }
  }
  print('Created loopback app $newName');
}

void setupSSL(String basePath) {
  Directory('$basePath/certificates').createSync();
  print('Do you have an existing SSL certificate for the service? [y/N]:');
  if (['y', 'yes'].contains(stdin.readLineSync().toLowerCase())) {
    getSSLCertificates(basePath);
  } else {
    generateSSLCertificates(basePath);
  }
}

void getSSLCertificates(String basePath) {
  print('Enter the path of the SSL Private key:');
  final keyPath = stdin.readLineSync();
  File(keyPath).copySync('$basePath/certificates/ssl.key');
  print('Enter the path of the SSL Certificate:');
  final certificatePath = stdin.readLineSync();
  File(certificatePath).copySync('$basePath/certificates/ssl.pem');
}

void generateSSLCertificates(String basePath) {
  print('Creating new self-signed SSL private key and certificate. '
      'Please enter the information requested:');
  Process.runSync(
      r'C:\Users\victor.divi\AppData\Local\Programs\Git\usr\bin\openssl.exe',
      [
        'req',
        '-nodes',
        '-x509',
        '-newkey',
        'rsa:4096',
        '-keyout',
        '$basePath/certificates/ssl.key',
        '-out',
        '$basePath/certificates/ssl.pem'
      ],
      runInShell: true);
  print('Self-signed SSL private key and certificate created. When changing the certificate to an '
      "actual certificate, overwrite the files at './certificates/' and update the paths "
      "at './src/index.ts' if necessary");
}
