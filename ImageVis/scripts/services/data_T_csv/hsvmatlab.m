% a  = imread('1.jpg');
% hsv=rgb2hsv(a);
% h=hsv(:,:,1);
% figure,
% subplot(2,2,1),imshow(hsv);title('hsv格式图');
% subplot(2,2,2),imshow(h);title('h');
fileFolder=fullfile('C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\');%文件夹名plane
dirOutput=dir(fullfile(fileFolder,'*'));%如果存在不同类型的文件，用‘*’读取所有，如果读取特定类型文件，'.'加上文件类型，例如用‘.jpg’
fileNames={dirOutput.name}';

TLfile = length(fileNames)

for Tnums=3:TLfile
    filename=['2016',fileNames{Tnums},'.csv'];
    fileFolder3 = fullfile(['C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\',fileNames{Tnums}]);
    DIR2=dir(fullfile(fileFolder3,'*'));
    fileNames4={DIR2.name}';
    fileNames4
    Lfile = size(fileNames4);
    fid=fopen(filename,'w');
    count=0;
    fprintf(fid,"%s,%s,%s,%s\n",'paperID','imageID','size','uncertainty');
    fprintf(fid,"%s,%s,%d,%d\n",'',['2016',fileNames{Tnums}],'',Lfile(1)-2);
    for index=3:Lfile
    fileFolder2 = fullfile(['C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\',fileNames{Tnums},'\',fileNames4{index}]);
    DIR = dir(fullfile(fileFolder2,'*'));
    fileNames2={DIR.name};
    fileNames2
    Lf2 = length(fileNames2)
    fprintf(fid,"%s,%s,%d,%d\n",['2016',fileNames{Tnums}],fileNames4{index},'',Lf2-2);
    for j=3:Lf2
        cell_str = strsplit( fileNames2{j},'%');
        cell_str{1,1}
        I = imread(['C:\Users\dong\Desktop\Keydata\class_data\imagesData(T1-T16)(07-16)\2016\',fileNames{Tnums},'\',fileNames4{index},'\',fileNames2{j}]);
        [M,N]=size(I);
%         S = ImgEntropy(I);
        fprintf(fid,"%s,%s,%d,%d\n",fileNames4{index},fileNames2{j},M*N,1);
    end
    
end
end
% filename='bubbledata.csv';





function [res] = ImgEntropy(I)
%求图像熵值
%传入一张彩色图片的矩阵
%输出图片的图像熵值

I_gray = rgb2gray(I);
[ROW,COL] = size(I_gray);


%%
%新建一个size =256的矩阵，用于统计256个灰度值的出现次数
temp = zeros(256);
for i= 1:ROW

for j = 1:COL
%统计当前灰度出现的次数
temp(I_gray(i,j)+1)= temp(I_gray(i,j)+1)+1;

end
end

%%

res = 0.0 ; 
for  i = 1:256
%计算当前灰度值出现的概率
temp(i) = temp(i)/(ROW*COL);

%如果当前灰度值出现的次数不为0
if temp(i)~=0.0

res = res - temp(i) * (log(temp(i)) / log(2.0));
end
end
disp(res);
end
