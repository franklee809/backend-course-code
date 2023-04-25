#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main(int argc, char **argv){

  int port = 5501;
  int sockfd;
  struct sockaddr_in myaddr, remoteAddr;
  char buffer[1024];
  socklen_t addr_size;

  sockfd = socket(AF_INET, SOCK_DGRAM, 0);

  memset(&myaddr, '\0', sizeof(myaddr));
  myaddr.sin_family = AF_INET;
  myaddr.sin_port = htons(port);
  myaddr.sin_addr.s_addr = inet_addr("127.0.0.1");

  bind(sockfd, (struct sockaddr*)&myaddr, sizeof(myaddr));

  while (1) {
    addr_size = sizeof(remoteAddr);
    recvfrom(sockfd, buffer, 1024, 0, (struct sockaddr*)&remoteAddr, &addr_size);
    printf("Got data from %s\n", buffer);

    // Check for a condition to exit the loop, e.g. receiving a specific message
    if (strcmp(buffer, "exit") == 0) {
      printf("Exiting...\n");
      break;
    }
  }

  return 0;
}